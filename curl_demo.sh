#delete
curl -v -X DELETE http://localhost:8080/parts/part1

#update
curl -v -H "Content-Type:application/json" -X PUT http://localhost:8080/parts/part2 -d '{"title":"curl me too"}'

#create
curl -v -H "Content-Type:application/json" -X POST http://localhost:8080/parts -d '{"name":"part40"}'