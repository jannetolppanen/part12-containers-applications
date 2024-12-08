# Dockerfile
# Ladataan dockerhubista valmis lähtökohta node20
FROM node:20

# Kontin kansio jossa asiat tehdään
WORKDIR /usr/src/app

# kopioidaan Dockerfilen kansiosta kaikki tiedostot kontin WORKDIR kansioon ja oikeuden node käyttjälle. node käyttäjä on valmiina node:20 kuvassa
COPY --chown=node:node . .

# npm install parempi versio, poistaa mm. node_modules
RUN npm ci

# express debug mode, tulostaa terminaaliin tietoja
# ENV DEBUG=playground:*

# Vaihdetaan kontin käyttäjäksi node eikä root
USER node

# Käyntiin
CMD npm start
