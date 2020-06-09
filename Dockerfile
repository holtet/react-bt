# specify the node base image with your desired version node:<version>
FROM node:12
# replace this with your application's default port
EXPOSE 8080
ENV 'API_URL', 'http://localhost:8080'
WORKDIR /home/node/app
COPY --chown=node package.json /home/node/app/
RUN yarn install
COPY --chown=node webpack.config.prod.js /home/node/app/
COPY --chown=node src /home/node/app/src
RUN npm run-script build
#COPY --chown=node node_modules /home/node/app/node_modules
ENTRYPOINT [ "npm", "run", "serve:build" ]
# COPY . .
#VOLUME [ "/home/node/app" ]
#ENV NODE_ENV=production

# dockerStrategy:
#       from:
#         kind: ImageStreamTag
#         namespace: openshift
#         name: 'node:12'
# favicon
# debugger, remove
# update maltdef hangs
# add maltdef
# view malts
# add/edit malts
# format malts
# sagas?
# MaltDefinitionManagerPageView cleanup
# auth
# corejs -> v3

# Spinner, wait for save
# intervjutrening, teresa, alexandra, Natalie
# Format date in box
# box of hopType details, change when dropdown changes

