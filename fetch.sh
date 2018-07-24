#!/bin/bash

set -eu

URL="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-23-07-2018/"

links -codepage utf-8 -dump "$URL" | grep -E '(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)'
