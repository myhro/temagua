#!/bin/bash

set -eu

links -codepage utf-8 -dump "$1" | grep -E '(SEGUNDA|TERÇA|QUARTA|QUINTA|SEXTA|SÁBADO|DOMINGO|TODOS)'
