#!/bin/bash

set -eu

#CW30="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-23-07-2018/"
URL="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-30-07/"

links -codepage utf-8 -dump "$URL" | grep -E '(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)'
