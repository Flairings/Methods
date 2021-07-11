# Other Methods
 tcp-ref: TCP Reflection from ports 80 and 443

 tcp-syn: SYN flood that cycles through TCP options

 teams: UDP method with multiple purposes. Putting 65536 as the port argument will attack Microsoft Teams ports (has had some success), putting 0 as the port will use larger packet size on random destination ports. Specifying a port e.g. 9000 will attack that port while cycling between lower length packets (good for game servers).