package main

import (
	"bytes"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"time"

	_ "github.com/mattn/go-sqlite3"
	"github.com/myhro/temagua/interruption"
)

const timeFormat = "2006-01-02 15:04:05"

var db *sql.DB

type KV struct {
	Key   string `json:"key"`
	Value string `json:"value"`
}

func fetchDB() []interruption.Interruption {
	rows, err := db.Query("SELECT region, datetime(start, 'utc') AS start, datetime(end, 'utc') AS end FROM interruption;")
	if err != nil {
		log.Fatal("Database error: ", err)
	}
	defer rows.Close()

	intset := []interruption.Interruption{}
	for rows.Next() {
		var inter interruption.Interruption
		var start string
		var end string
		err = rows.Scan(&inter.Region, &start, &end)
		if err != nil {
			log.Fatal("Database error: ", err)
		}
		inter.Start = parseTime(start)
		inter.End = parseTime(end)
		intset = append(intset, inter)
	}

	return intset
}

func getInterruptions() []KV {
	var kvs []KV
	intset := fetchDB()

	for _, inter := range intset {
		entry := KV{
			Key:   fmt.Sprintf("%v:%v", inter.Start.Format("2006-01-02"), inter.Region),
			Value: fmt.Sprintf("%v|%v", inter.Start.Format(timeFormat), inter.End.Format(timeFormat)),
		}
		kvs = append(kvs, entry)
	}

	return kvs
}

func getLastInterruption() KV {
	rows, err := db.Query("SELECT MAX(datetime(end, 'utc')) AS end FROM interruption;")
	if err != nil {
		log.Fatal("Database error: ", err)
	}
	defer rows.Close()

	var kv KV
	if rows.Next() {
		var end string
		err = rows.Scan(&end)
		if err != nil {
			log.Fatal("Database error: ", err)
		}

		kv.Key = "last"
		kv.Value = end
	}

	return kv
}

func parseTime(dt string) time.Time {
	t, err := time.Parse(timeFormat, dt)
	if err != nil {
		log.Fatal("Couldn't parse time: ", err)
	}
	return t
}

func init() {
	var err error
	db, err = sql.Open("sqlite3", "sqlite.db")
	if err != nil {
		log.Fatal("Database error: ", err)
	}
}

func main() {
	kvDB := getInterruptions()
	kvDB = append(kvDB, getLastInterruption())

	dump, err := json.Marshal(kvDB)
	if err != nil {
		log.Fatal(err)
	}

	var out bytes.Buffer
	json.Indent(&out, dump, "", "  ")
	fmt.Println(out.String())
}
