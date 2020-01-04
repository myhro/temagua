package main

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/PuerkitoBio/goquery"
	"github.com/gorilla/feeds"
)

const baseURL = "http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/filter"
const feedURL = baseURL + "?area=/site-copasa-conteudos/internet/perfil/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros"

func clean(s string) string {
	s = strings.Replace(s, "\n", "", -1)
	s = strings.Join(strings.Fields(s), " ")
	return s
}

func main() {
	req, err := http.NewRequest("GET", feedURL, nil)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Add("Accept-Language", "en-us")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	doc, err := goquery.NewDocumentFromResponse(resp)
	if err != nil {
		log.Fatal(err)
	}

	feed := &feeds.Feed{
		Title: "Copasa - Em Racionamento - Montes Claros",
		Link:  &feeds.Link{Href: feedURL},
	}

	doc.Find(".item").Each(func(i int, s *goquery.Selection) {
		if i > 9 {
			return
		}

		date := s.Find(".data").Text()
		title := s.Find(".titulo-imprensa").Text()
		link, _ := s.Find(".titulo-imprensa").Find("a").Attr("href")
		description := s.Find(".texto-imprensa").Text()
		created, err := time.Parse("02 Jan 2006", clean(date))
		if err != nil {
			log.Fatal(err)
		}

		item := &feeds.Item{
			Title:       clean(title),
			Link:        &feeds.Link{Href: baseURL + link},
			Description: clean(description),
			Created:     created,
		}
		feed.Items = append(feed.Items, item)
	})

	atom, err := feed.ToAtom()
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println(atom)
}
