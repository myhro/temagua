package main

import (
	"database/sql"
	"log"
	"os"
	"path/filepath"

	_ "github.com/mattn/go-sqlite3"
	"github.com/myhro/temagua/interruption"
)

var db *sql.DB

func createDB() {
	create := `
CREATE TABLE IF NOT EXISTS interruption (
	id INTEGER PRIMARY KEY,
	region INTEGER,
	start TEXT,
	end TEXT,

	UNIQUE(region, start, end)
);
`

	stmt, err := db.Prepare(create)
	if err != nil {
		log.Fatal("Database error: ", err)
	}
	stmt.Exec()
}

func importDB(sources []string) {
	stmt, err := db.Prepare("INSERT INTO interruption (region, start, end) VALUES (?, ?, ?);")
	if err != nil {
		log.Fatal("Database error: ", err)
	}

	for _, s := range sources {
		intset := interruption.NewSet(s)
		for _, int := range intset.List {
			stmt.Exec(int.Region, int.Start, int.End)
		}
	}
}

func init() {
	var err error
	db, err = sql.Open("sqlite3", "sqlite.db")
	if err != nil {
		log.Fatal("Database error: ", err)
	}
}

func main() {
	createDB()

	folder := "data/"
	sources := []string{}
	err := filepath.Walk(folder, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if path == folder {
			return nil
		}
		sources = append(sources, path)
		return nil
	})
	if err != nil {
		log.Fatal("Error loading data sources: ", err)
	}

	importDB(sources)
}
