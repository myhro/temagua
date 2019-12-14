package main

import (
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func internalServerError(c *gin.Context) {
	c.String(http.StatusInternalServerError, "Internal Server Error")
}

func getInterruption(c *gin.Context) {
	region, err := strconv.Atoi(c.Query("region"))
	if err != nil {
		log.Print(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "not a valid region",
		})
		return
	}

	if dbIsOutOfDate() {
		c.JSON(http.StatusConflict, gin.H{
			"error":    "database is out of date",
			"outdated": true,
		})
		return
	}

	query := `
	SELECT start, end
		FROM interruption
		WHERE region = ?
		AND datetime('now') >= start
		AND datetime('now') <= end;
`
	rows, err := db.Query(query, region)
	if err != nil {
		log.Print(err)
		internalServerError(c)
		return
	}
	defer rows.Close()

	var res gin.H
	if rows.Next() {
		var start string
		var end string
		rows.Scan(&start, &end)
		res = gin.H{
			"region":      region,
			"start":       start,
			"end":         end,
			"interrupted": true,
		}
	} else {
		res = gin.H{
			"region":      region,
			"interrupted": false,
		}
	}

	c.JSON(http.StatusOK, res)
}
