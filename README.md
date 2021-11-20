# Background

The [Northern part of the Minas Gerais State suffers from drought from time to time][1], specially during the end/beginning of the year. For this reason, the company responsible for water distribution in the region started a rationing system. During this period, some cities/neighborhoods have no water running in the pipes a few (usually 1-2) days a week.

What this project does is to process the [restriction schedule][2] for the city of [Montes Claros][3], offering the same information in a much more user-friendly way.

# Components

- Parsers in the `parser/` folder and the `interruption` package.
- Database dump/restore tools in the `cmd/` folder.
- Web app in the `webapp/` folder.


[1]: https://en.wikipedia.org/wiki/Minas_Gerais#Geography
[2]: http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/filter?area=/site-copasa-conteudos/internet/perfil/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros
[3]: https://en.wikipedia.org/wiki/Montes_Claros
