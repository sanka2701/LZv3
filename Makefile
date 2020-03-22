install:
  docker-compose -f docker-compose.dev.yml run --rm api_install
dev:
  docker-compose -f docker-compose.dev.yml up