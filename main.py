#!/usr/bin/python3

from ip_lookup import ip_lookup, button_lookup
import sys
import json
import urllib.request

from csvfile import *

if __name__ == "__main__":
	list_of_domains = []
	list_of_buttons = []
	list_of_everything = []

	if len(sys.argv) > 1:
		contents = parse(sys.argv[1])
		for each in contents:
			obj = make_JSON(contents)	
		for each_ip in obj:	
			domain = ip_lookup(each_ip)
			button = button_lookup(domain)
			list_of_everything = list_of_everything + [{'domain':domain,'button':button}]
	else:
		print("Enter file...")
	
	packet = {
		"domain" : None,
		"button" : None,
	}

	url = 'http://localhost:5024/hello'
	for each in list_of_everything:
		params = json.dumps(each).encode('utf8')

		req = urllib.request.Request(url, data=params, headers={'content-type':'application/json'})
		response = urllib.request.urlopen(req)