if [ "${MONGO_TRAINER_USER}" ] && [ "${MONGO_TRAINER_PASSWORD}" ]; then
    "${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOF
    db.createUser({
        user: $(_js_escape "${MONGO_TRAINER_USER}"),
        pwd: $(_js_escape "${MONGO_TRAINER_PASSWORD}"),
        roles: [
                { role: "readWrite", db: "${MONGO_INITDB_DATABASE}" }
        ]
    })
EOF
fi