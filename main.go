package main

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	var err error
	db, err = sql.Open("sqlite3", "sqlite.db")
	if err != nil {
		log.Fatal(err)
	}

	createDB()
	importDB()
}
