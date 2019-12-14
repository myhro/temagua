package interruption

import (
	"fmt"
	"io/ioutil"
	"log"
	"strconv"
	"strings"
	"time"
)

type Interruption struct {
	Region int
	Start  time.Time
	End    time.Time
}

type Set struct {
	Content string
	List    []Interruption
	Lines   [][]string
	Source  string
}

func NewSet(s string) *Set {
	set := Set{
		Source: s,
	}
	set.load()
	return &set
}

func (i Interruption) String() string {
	return fmt.Sprintf("Region: %v, Start: %v, End: %v", i.Region, i.Start, i.End)
}

func (iset *Set) clean() {
	iset.Content = strings.Trim(iset.Content, "\n")
	for _, line := range strings.Split(iset.Content, "\n") {
		cols := []string{}
		for _, c := range strings.Fields(line) {
			// Ignore useless separators
			if c == "e" {
				continue
			}
			c = strings.Trim(c, ",")

			cols = append(cols, c)
		}
		iset.Lines = append(iset.Lines, cols)
	}
}

func (iset *Set) fixTimeZones() {
	for i := range iset.List {
		iset.List[i].Start = fixTimeZone(iset.List[i].Start)
		iset.List[i].End = fixTimeZone(iset.List[i].End)
	}
}

func (iset *Set) load() {
	buf, err := ioutil.ReadFile(iset.Source)
	if err != nil {
		log.Print(err)
	}
	iset.Content = string(buf)
	iset.clean()
	iset.parse()
}

func (iset *Set) parse() {
	for i := range iset.Lines {
		dates := iset.parseDates(i)
		regions := iset.parseRegions(i)
		for _, r := range regions {
			for _, d := range dates {
				tmp := Interruption{
					Region: r,
					Start:  d.Start,
					End:    d.End,
				}
				iset.List = append(iset.List, tmp)
			}
		}
	}
	iset.fixTimeZones()
}

func (iset *Set) parseAllDays(i int) []Interruption {
	dates := []time.Time{}
	list := []Interruption{}

	timestamps := strings.Split(iset.Source, "/")
	timestamps = strings.Split(timestamps[1], ".")
	timestamps = strings.Split(timestamps[0], "-to-")
	for _, t := range timestamps {
		d, err := time.Parse("2006-01-02", t)
		if err != nil {
			log.Print("Couldn't parse date: ", err)
			continue
		}
		dates = append(dates, d)
	}

	hours, err := strconv.Atoi(strings.Trim(iset.Lines[i][4], "h"))
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
			Region: reg,
			Start:  start,
			End:    end,
		}
		list = append(list, tmp)
		start = start.Add(24 * time.Hour)
		end = end.Add(24 * time.Hour)
	}

	return list
}

func (iset *Set) parseDates(i int) []Interruption {
	list := []Interruption{}

	if iset.Lines[i][0] == "TODOS" {
		return iset.parseAllDays(i)
	}

	start, err := time.Parse("02/01/2006", iset.Lines[i][3])
	if err != nil {
		log.Print("Couldn't parse date: ", err)
		return list
	}

	duration := iset.parseDuration(i)
	end := start.Add(duration)

	interr := Interruption{
		Start: start,
		End:   end,
	}

	list = append(list, interr)

	return list
}

func (iset *Set) parseDuration(i int) time.Duration {
	last := len(iset.Lines[i]) - 1
	dur := iset.Lines[i][last-1]
	if iset.Lines[i][last] != "horas" {
		dur = iset.Lines[i][last]
		dur = strings.Trim(dur, "h")
	}

	hours, err := strconv.Atoi(dur)
	if err != nil {
		log.Print("Couldn't parse duration: ", err)
	}

	return time.Duration(hours) * time.Hour
}

func (iset *Set) parseRegions(i int) []int {
	pos := []int{
		1,
	}
	regions := []int{}

	if iset.Lines[i][0] != "TODOS" {
		pos = append(pos, 2)
	}

	for _, p := range pos {
		r, err := strconv.Atoi(iset.Lines[i][p])
		if err != nil {
			log.Print("Couldn't parse region: ", err)
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
