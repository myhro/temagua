package main

import (
	"database/sql"
	"log"

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
		log.Print(err)
		return
	}
	stmt.Exec()

}

func dbIsOutOfDate() bool {
	rows, err := db.Query("SELECT 1 FROM (SELECT * FROM interruption ORDER BY end DESC LIMIT 1) WHERE datetime('now') > end;")
	if err != nil {
		log.Print(err)
		return false
	}
	defer rows.Close()

	if rows.Next() {
		return true
	}
	return false
}

func importDB() {
	sources := []string{
		"data/2019-11-18-to-2019-11-24.txt",
		"data/2019-11-25-to-2019-12-01.txt",
		"data/2019-12-02-to-2019-12-08.txt",
		"data/2019-12-09-to-2019-12-15.txt",
		"data/2019-12-16-to-2019-12-22.txt",
	}

	stmt, err := db.Prepare("INSERT INTO interruption (region, start, end) VALUES (?, ?, ?);")
	if err != nil {
		log.Print(err)
		return
	}

	for _, s := range sources {
		intset := interruption.NewSet(s)
		for _, int := range intset.List {
			stmt.Exec(int.Region, int.Start, int.End)
		}
	}
}
