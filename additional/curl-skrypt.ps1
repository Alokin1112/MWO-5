#!/bin/bash

${BASE_URL}="http://localhost:8080/api/v1/books"

# Get Books
 curl -X GET  "${BASE_URL}?page=0&take=5"

echo ""
echo ""

# Get Books Page not full
 curl -X GET  "${BASE_URL}?page=1&take=4"

echo ""
echo ""

# Get Books take less than 0
 curl -X GET  "${BASE_URL}?page=1&take=-2"

echo ""
echo ""

# Get Books take and page less than 0
 curl -X GET  "${BASE_URL}?page=-1&take=-2"

echo ""
echo ""

# Get Books page less than 0
 curl -X GET  "${BASE_URL}?page=-1&take=2"

echo ""
echo ""

# Get Books missing take
 curl -X GET  "${BASE_URL}?page=1"

echo ""
echo ""

# Get Books missing page
 curl -X GET  "${BASE_URL}?take=2"

echo ""
echo ""

# Empty body
curl -X POST -H "Content-Type: application/json" -d "{}" "${BASE_URL}"

echo ""
echo ""

# Add book
curl -X POST -H "Content-Type: application/json" -d  '{
    "title": "Stan Lee. Człowiek Marvel",
    "author_id": 15,
    "pageCount": 420,
    "price": 49.99,
    "photoUrl": "https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/stan-lee-czlowiek-marvel-b-iext137638891.jpg"
}' "${BASE_URL}"

echo ""
echo ""

# Add book with specified ID
curl -X POST -H "Content-Type: application/json" -d '{
    "id": 1,
    "title": "Stan Lee. Człowiek Marvel",
    "author_id": 15,
    "pageCount": 420,
    "price": 49.99,
    "photoUrl": "https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/stan-lee-czlowiek-marvel-b-iext137638891.jpg"
}' "${BASE_URL}" 

echo ""
echo ""

# Successful delete
 curl -X DELETE "${BASE_URL}/8"

echo ""
echo ""

# Delete is not in db
 curl -X DELETE "${BASE_URL}/9999"

echo ""
echo ""

# Edit Book
curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Stan Lee. Człowiek Marvel",
    "author_id": 15,
    "pageCount": 444,
    "price": 49.99,
    "photoUrl": "https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/stan-lee-czlowiek-marvel-b-iext137638891.jpg"
}' "${BASE_URL}/4"

echo ""
echo ""

# Edit Book wrong id
curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Stan Lee. Człowiek Marvel",
    "author_id": 15,
    "pageCount": 444,
    "price": 49.99,
    "photoUrl": "https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/stan-lee-czlowiek-marvel-b-iext137638891.jpg"
}' "${BASE_URL}/9999" 

echo ""
echo ""

# Edit Book empty id
curl -X PUT -H "Content-Type: application/json" -d '{
    "title": "Stan Lee. Człowiek Marvel",
    "author_id": 15,
    "pageCount": 444,
    "price": 49.99,
    "photoUrl": "https://ecsmedia.pl/cdn-cgi/image/format=webp,/c/stan-lee-czlowiek-marvel-b-iext137638891.jpg"
}' "${BASE_URL}" 
