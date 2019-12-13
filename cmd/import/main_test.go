package main

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestParseDateFormatV1(t *testing.T) {
	intset := InterruptionSet{
		source: "testdata/2019-12-09-to-2019-12-15.txt",
	}
	intset.load()

	first := intset.list[0]
	assert.Equal(t, 2019, first.start.Year())
	assert.Equal(t, time.December, first.start.Month())
	assert.Equal(t, 9, first.start.Day())
	assert.Equal(t, 2019, first.end.Year())
	assert.Equal(t, time.December, first.end.Month())
	assert.Equal(t, 10, first.end.Day())

	last := intset.list[len(intset.list)-1]
	assert.Equal(t, 2019, last.start.Year())
	assert.Equal(t, time.December, last.start.Month())
	assert.Equal(t, 15, last.start.Day())
	assert.Equal(t, 2019, last.end.Year())
	assert.Equal(t, time.December, last.end.Month())
	assert.Equal(t, 16, last.end.Day())
}

func TestParseHourFormatV1(t *testing.T) {
	intset := InterruptionSet{
		source: "testdata/2019-12-09-to-2019-12-15.txt",
	}
	intset.load()

	first := intset.list[0]
	assert.Equal(t, 0, first.start.Hour())
	assert.Equal(t, 0, first.start.Minute())
	assert.Equal(t, 0, first.end.Hour())
	assert.Equal(t, 0, first.end.Minute())

	last := intset.list[len(intset.list)-1]
	assert.Equal(t, 22, last.start.Hour())
	assert.Equal(t, 0, last.start.Minute())
	assert.Equal(t, 4, last.end.Hour())
	assert.Equal(t, 0, last.end.Minute())
}

func TestParseRegionFormatV1(t *testing.T) {
	intset := InterruptionSet{
		source: "testdata/2019-12-09-to-2019-12-15.txt",
	}
	intset.load()

	assert.Equal(t, 3, intset.list[0].region)
	assert.Equal(t, 4, intset.list[1].region)
	for i := 0; i < 7; i++ {
		assert.Equal(t, 5, intset.list[i+2].region)
	}
}
