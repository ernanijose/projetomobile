const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response){
        const devs = await Dev.find();
        return response.json(devs);
    },
    async store(request, response){   
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        //console.log(dev);
        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = (apiResponse.data);

            //const techsArray = techs.split(', ').map(tech => tech.trim());
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }  
        
        return response.json(dev);
    },

    async update(request, response){
        const { github_username, techs, latitude, longitude } = request.body;
        console.log(request.body);
        let dev = await Dev.findOne({ github_username });
        if(dev){
            const techsArray = parseStringAsArray(techs);
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = (apiResponse.data);
            const location = {            
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            dev = await Dev.updateOne(
                { github_username },
                {
                   $set: {
                    name: name,
                    avatar_url,
                    bio,
                    techs: techsArray,
                    location
                   }
                }
            );

            return response.status(200).json(dev);
        }

        return response.status(404).json({dev: "Nao encontrou"});       

    },

    async destroy(request, response){
        const { github_username } = request.params;
        console.log(github_username);
        const dev = await Dev.findOneAndDelete({github_username});
        //console.log(dev);
        if(dev){            
            return response.status(200).json( dev );
        }
        return response.status(404).json({ dev: "Não foi possivel encontrar o Dev!"});
    },

    async delete(request, response){
        const { id } = request.params;
       
        const dev = await Dev.findById({id});
        console.log(dev);

        if(dev){            
            return response.status(200).json({ dev });
        }
        return response.status(404).json({ dev: "Não foi possivel encontrar o Dev!"});
    }
}