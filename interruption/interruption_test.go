package interruption

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestParseDateFormatV1(t *testing.T) {
	intset := NewSet("testdata/2019-12-09-to-2019-12-15.txt")

	first := intset.List[0]
	assert.Equal(t, 2019, first.Start.Year())
	assert.Equal(t, time.December, first.Start.Month())
	assert.Equal(t, 9, first.Start.Day())
	assert.Equal(t, 2019, first.End.Year())
	assert.Equal(t, time.December, first.End.Month())
	assert.Equal(t, 10, first.End.Day())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 2019, last.Start.Year())
	assert.Equal(t, time.December, last.Start.Month())
	assert.Equal(t, 15, last.Start.Day())
	assert.Equal(t, 2019, last.End.Year())
	assert.Equal(t, time.December, last.End.Month())
	assert.Equal(t, 16, last.End.Day())
}

func TestParseDateFormatV2(t *testing.T) {
	intset := NewSet("testdata/2019-12-16-to-2019-12-22.txt")

	first := intset.List[0]
	assert.Equal(t, 2019, first.Start.Year())
	assert.Equal(t, time.December, first.Start.Month())
	assert.Equal(t, 16, first.Start.Day())
	assert.Equal(t, 2019, first.End.Year())
	assert.Equal(t, time.December, first.End.Month())
	assert.Equal(t, 17, first.End.Day())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 2019, last.Start.Year())
	assert.Equal(t, time.December, last.Start.Month())
	assert.Equal(t, 22, last.Start.Day())
	assert.Equal(t, 2019, last.End.Year())
	assert.Equal(t, time.December, last.End.Month())
	assert.Equal(t, 23, last.End.Day())
}

func TestParseDateFormatV3(t *testing.T) {
	intset := NewSet("testdata/2019-12-30-to-2020-01-05.txt")

	first := intset.List[0]
	assert.Equal(t, 2019, first.Start.Year())
	assert.Equal(t, time.December, first.Start.Month())
	assert.Equal(t, 30, first.Start.Day())
	assert.Equal(t, 2019, first.End.Year())
	assert.Equal(t, time.December, first.End.Month())
	assert.Equal(t, 31, first.End.Day())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 2020, last.Start.Year())
	assert.Equal(t, time.January, last.Start.Month())
	assert.Equal(t, 05, last.Start.Day())
	assert.Equal(t, 2020, last.End.Year())
	assert.Equal(t, time.January, last.End.Month())
	assert.Equal(t, 06, last.End.Day())
}

func TestParseHourFormatV1(t *testing.T) {
	intset := NewSet("testdata/2019-12-09-to-2019-12-15.txt")

	first := intset.List[0]
	assert.Equal(t, 0, first.Start.Hour())
	assert.Equal(t, 0, first.Start.Minute())
	assert.Equal(t, 0, first.End.Hour())
	assert.Equal(t, 0, first.End.Minute())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 22, last.Start.Hour())
	assert.Equal(t, 0, last.Start.Minute())
	assert.Equal(t, 4, last.End.Hour())
	assert.Equal(t, 0, last.End.Minute())
}

func TestParseHourFormatV2(t *testing.T) {
	intset := NewSet("testdata/2019-12-16-to-2019-12-22.txt")

	first := intset.List[0]
	assert.Equal(t, 0, first.Start.Hour())
	assert.Equal(t, 0, first.Start.Minute())
	assert.Equal(t, 0, first.End.Hour())
	assert.Equal(t, 0, first.End.Minute())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 22, last.Start.Hour())
	assert.Equal(t, 0, last.Start.Minute())
	assert.Equal(t, 4, last.End.Hour())
	assert.Equal(t, 0, last.End.Minute())
}

func TestParseHourFormatV3(t *testing.T) {
	intset := NewSet("testdata/2019-12-30-to-2020-01-05.txt")

	first := intset.List[0]
	assert.Equal(t, 0, first.Start.Hour())
	assert.Equal(t, 0, first.Start.Minute())
	assert.Equal(t, 0, first.End.Hour())
	assert.Equal(t, 0, first.End.Minute())

	last := intset.List[len(intset.List)-1]
	assert.Equal(t, 22, last.Start.Hour())
	assert.Equal(t, 0, last.Start.Minute())
	assert.Equal(t, 4, last.End.Hour())
	assert.Equal(t, 0, last.End.Minute())
}

func TestParseRegionFormatV1(t *testing.T) {
	intset := NewSet("testdata/2019-12-09-to-2019-12-15.txt")

	assert.Equal(t, 3, intset.List[0].Region)
	assert.Equal(t, 4, intset.List[1].Region)
	for i := 0; i < 7; i++ {
		assert.Equal(t, 5, intset.List[i+2].Region)
	}
}

func TestParseRegionFormatV2(t *testing.T) {
	intset := NewSet("testdata/2019-12-16-to-2019-12-22.txt")

	assert.Equal(t, 1, intset.List[0].Region)
	assert.Equal(t, 2, intset.List[1].Region)
	for i := 0; i < 7; i++ {
		assert.Equal(t, 5, intset.List[i+2].Region)
	}
}

func TestParseRegionFormatV3(t *testing.T) {
	intset := NewSet("testdata/2019-12-30-to-2020-01-05.txt")

	assert.Equal(t, 1, intset.List[0].Region)
	assert.Equal(t, 2, intset.List[1].Region)
	assert.Equal(t, 7, len(intset.List))
	for i := 0; i < 5; i++ {
		assert.Equal(t, 5, intset.List[i+2].Region)
	}
}
