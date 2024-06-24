#!/bin/bash
mongosh -u admin -p admin <<EOF
use study
db.nationalities.insertMany([
  { name: 'Argentina' },
  { name: 'Brazil' },
  { name: 'USA' },
  { name: 'Spain' },
])
EOF
