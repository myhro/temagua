package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
	"time"
)

type Interruption struct {
	region int
	start  time.Time
	end    time.Time
}

type InterruptionSet struct {
	content string
	list    []Interruption
	lines   [][]string
	source  string
}

var sources = []string{
	"2019-12-09-to-2019-12-15.txt",
}

func (i Interruption) String() string {
	return fmt.Sprintf("Region: %v, Start: %v, End: %v", i.region, i.start, i.end)
}

func (iset *InterruptionSet) clean() {
	iset.content = strings.Trim(iset.content, "\n")
	for _, line := range strings.Split(iset.content, "\n") {
		cols := []string{}
		for _, c := range strings.Fields(line) {
			c = strings.Trim(c, ",")
			cols = append(cols, c)
		}
		iset.lines = append(iset.lines, cols)
	}
}

func (iset *InterruptionSet) fixTimeZones() {
	for i := range iset.list {
		iset.list[i].start = fixTimeZone(iset.list[i].start)
		iset.list[i].end = fixTimeZone(iset.list[i].end)
	}
}

func (iset *InterruptionSet) load() {
	buf, err := ioutil.ReadFile("data/" + iset.source)
	if err != nil {
		log.Print(err)
	}
	iset.content = string(buf)
	iset.clean()
	iset.parse()
}

func (iset *InterruptionSet) parse() {
	for i := range iset.lines {
		fmt.Println(iset.lines[i])
		dates := iset.parseDates(i)
		regions := iset.parseRegions(i)
		for _, r := range regions {
			for _, d := range dates {
				tmp := Interruption{
					region: r,
					start:  d.start,
					end:    d.end,
				}
				iset.list = append(iset.list, tmp)
			}
		}
	}
	iset.fixTimeZones()
	for _, entry := range iset.list {
		fmt.Println(entry)
	}
}

func (iset *InterruptionSet) parseAllDays(i int) []Interruption {
	dates := []time.Time{}
	list := []Interruption{}

	timestamps := strings.Split(iset.source, ".")
	timestamps = strings.Split(timestamps[0], "-to-")
	for _, t := range timestamps {
		d, err := time.Parse("2006-01-02", t)
		if err != nil {
			log.Print("Couldn't parse date: ", err)
			continue
		}
		dates = append(dates, d)
	}

	hours, err := strconv.Atoi(strings.Trim(iset.lines[i][4], "h"))
	if err != nil {
		log.Print("Couldn't parse date: ", err)
		return list
	}

	var reg int
	regions := iset.parseRegions(i)
	if len(regions) > 0 {
		reg = regions[0]
	}

	start := dates[0]
	start = start.Add(time.Duration(hours) * time.Hour)
	dates[1] = dates[1].Add(time.Duration(hours) * time.Hour)
	end := start.Add(iset.parseDuration(i))

	for start.After(dates[1]) != true {
		tmp := Interruption{
			region: reg,
			start:  start,
			end:    end,
		}
		list = append(list, tmp)
		start = start.Add(24 * time.Hour)
		end = end.Add(24 * time.Hour)
	}

	return list
}

func (iset *InterruptionSet) parseDates(i int) []Interruption {
	list := []Interruption{}

	if iset.lines[i][0] == "TODOS" {
		return iset.parseAllDays(i)
	}

	start, err := time.Parse("02/01/2006", iset.lines[i][3])
	if err != nil {
		log.Print("Couldn't parse date: ", err)
		return list
	}

	duration := iset.parseDuration(i)
	end := start.Add(duration)

	interr := Interruption{
		start: start,
		end:   end,
	}

	list = append(list, interr)

	return list
}

func (iset *InterruptionSet) parseDuration(i int) time.Duration {
	pos := len(iset.lines[i]) - 2

	hours, err := strconv.Atoi(iset.lines[i][pos])
	if err != nil {
		log.Print("Couldn't parse duration: ", err)
	}

	return time.Duration(hours) * time.Hour
}

func (iset *InterruptionSet) parseRegions(i int) []int {
	pos := []int{
		1,
	}
	regions := []int{}

	if iset.lines[i][0] != "TODOS" {
		pos = append(pos, 2)
	}

	for _, p := range pos {
		r, err := strconv.Atoi(iset.lines[i][p])
		if err != nil {
			log.Print("Couldn't parse region: ", r)
			continue
		}
		regions = append(regions, r)
	}

	return regions
}

func fixTimeZone(t time.Time) time.Time {
	loc, err := time.LoadLocation("America/Sao_Paulo")
	if err != nil {
		log.Print("Couldn't load location: ", err)
		return t
	}

	t = t.In(loc)
	_, offset := t.Zone()
	t = t.Add(time.Duration(-offset) * time.Second)

	return t
}

func main() {
	for _, s := range sources {
		intset := InterruptionSet{
			source: s,
		}
		intset.load()
	}
}
