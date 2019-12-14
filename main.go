package main

import (
	"database/sql"
	"log"

	"github.com/gin-gonic/gin"
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

	r := gin.Default()
	r.GET("/interruption", getInterruption)
	r.Run()
}
