#!/bin/bash

set -eu

#CW30="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-23-07-2018/"
#CW31="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-30-07/"
#CW32="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-montes-claros-06-08-2018-a-14-08-2018-06-08-2018/"
#CW33="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-montes-claros-13-08-2018-a-21-08-2018-13-08-2018/"
URL="http://www.copasa.com.br/wps/portal/internet/imprensa/noticias/plano-de-racionamento/em-racionamento/co-montes-claros/rodizio-em-montes-claros-20-08/"

links -codepage utf-8 -dump "$URL" | grep -E '(Segunda|Terça|Quarta|Quinta|Sexta|Sábado|Domingo)'
