package main

import (
	"database/sql"
	"log"

	"github.com/gin-contrib/cors"
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

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"}

	router := gin.Default()
	router.Use(cors.New(config))
	router.GET("/interruption", getInterruption)
	router.Run()
}
