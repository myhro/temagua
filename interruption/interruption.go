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
	Content         string
	List            []Interruption
	Lines           [][]string
	NonInterruption map[string]bool
	Source          string
}

func NewSet(s string) *Set {
	set := Set{
		NonInterruption: make(map[string]bool),
		Source:          s,
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
		for _, c := range strings.Split(line, "|") {
			c = strings.TrimSpace(c)
			if len(c) == 0 {
				continue
			}
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
		if iset.skipLine(i) {
			continue
		}

		regions := iset.parseRegions(i)
		dates := iset.parseDates(i)
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

	var reg int
	regions := iset.parseRegions(i)
	if len(regions) > 0 {
		reg = regions[0]
	}

	hour, err := iset.parseStartingHour(i)
	if err != nil {
		log.Print("Couldn't parse starting hour: ", err)
		return list
	}

	start := dates[0]
	start = start.Add(time.Duration(hour) * time.Hour)
	dates[1] = dates[1].Add(time.Duration(hour) * time.Hour)
	end := start.Add(iset.parseDuration(i))

	for start.After(dates[1]) != true {
		tmp := Interruption{
			Region: reg,
			Start:  start,
			End:    end,
		}
		day := start.Format("02/01/2006")
		start = start.Add(24 * time.Hour)
		end = end.Add(24 * time.Hour)
		// Current day is checked after advancing time to avoid an infinite loop
		if iset.NonInterruption[day] {
			continue
		}
		list = append(list, tmp)
	}

	return list
}

func (iset *Set) parseDates(i int) []Interruption {
	list := []Interruption{}

	if iset.Lines[i][0] == "TODOS" {
		return iset.parseAllDays(i)
	}

	start, err := time.Parse("02/01/2006", iset.Lines[i][2])
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
	size := len(iset.Lines[i])
	last := iset.Lines[i][size-1]

	var dur string
	if strings.HasSuffix(last, "horas") {
		dur = strings.Split(last, " ")[0]
	} else {
		dur = strings.Trim(last, "h")
	}

	hours, err := strconv.Atoi(dur)
	if err != nil {
		log.Print("Couldn't parse duration: ", err)
	}

	return time.Duration(hours) * time.Hour
}

func (iset *Set) parseRegions(i int) []int {
	col := iset.Lines[i][1]
	regList := []string{}
	if strings.Contains(col, ",") {
		regList = strings.Split(col, ",")
	} else if strings.Contains(col, "e") {
		regList = strings.Split(col, "e")
	} else {
		regList = append(regList, col)
	}

	regions := []int{}
	for _, e := range regList {
		e = strings.TrimSpace(e)
		r, err := strconv.Atoi(e)
		if err != nil {
			log.Print("Couldn't parse region: ", err)
			continue
		}
		regions = append(regions, r)
	}

	return regions
}

func (iset *Set) parseStartingHour(i int) (int, error) {
	var hour string
	for _, w := range strings.Split(iset.Lines[i][2], " ") {
		if strings.HasSuffix(w, "h") {
			hour = strings.Trim(w, "h")
			break
		}
	}
	return strconv.Atoi(hour)
}

func (iset *Set) skipLine(i int) bool {
	first := iset.Lines[i][0]
	if first == "Dia" || first == "Data" {
		return true
	} else if iset.Lines[i][1] == "*" {
		date := iset.Lines[i][2]
		iset.NonInterruption[date] = true
		return true
	}
	return false
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
