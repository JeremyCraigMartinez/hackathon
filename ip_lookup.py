import json

def ip_lookup(ip):
	with open("ip.json") as ips:
		ip_dict = json.load(ips)
		for domain in ip_dict:
			for ip_address in ip_dict[domain]:
				if ip_address == ip:
					return domain
	return None

def button_lookup(domain):
	if domain is None:
		return None
	with open("button_mapping.json") as buttons:
		button_dict = json.load(buttons)
		for button in button_dict:
			for domains in button_dict[button]:
				if domains.lower() == domain.lower():
					return button
	return None