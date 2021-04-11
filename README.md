## Task mate

This is a full-stack project and uses Next.js, Typescript,
GraphQL, Apollo Server, MySQL, CSS.

### Getting Started

        Get-Content db/schema.sql | docker exec -i task-next-ts_mysql_1 sh -c 'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" $MYSQL_DATABASE'

        docker-compose up

        npm run dev

        http://localhost:3000/

## Deploy on Vercel

![TaskMate](/public/logo.png)
