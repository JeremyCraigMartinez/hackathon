#!/usr/bin/python3

import csv
import os
import sys
import re

regex_columns = { #number at the beginning of the key is for sorted purposes
	'4': ('ip_address','\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d+)?'),
}	

regex_lookup = { #number at the beginning of the key is for sorted purposes
	'ip_address' : '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\/\d+)?',
}	

order = ['ip_address']

def parse(f):
	with open(f) as log:
		for line in log:
			yield line

def make_JSON(contents):
	arr = []
	for row in contents:
		for header in order:
			for string in re.finditer(regex_lookup[header],row):
				s = string.group().strip()
				arr = arr + [s[:s.index("/")]]
	return arr

if __name__ == '__main__':
	contents = parse(sys.argv[1])
	for each in contents:
		obj = make_JSON(contents)
	#print(obj)