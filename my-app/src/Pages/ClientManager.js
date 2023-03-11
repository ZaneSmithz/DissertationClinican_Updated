import {useState, useEffect, React} from 'react'
import ModuleCard from '../Components/Cards/ModuleCard';
import useContentful from '../useContenful';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'

const query = `
query {
  moduleCollection(limit: 10){
    items{
      moduleTitle
      moduleId
      moduleChapters{
        links{
          entries{
            block {
              __typename
              ...on Chapter {
                chapterId
                userInput
                chapterTitle
                chapterImage{
                  title
              		contentType
                  url
                }
                chapterActivity{
                  json
                }
                
              }
            }
          }
        }
      }
      
    }
  }
}
`;
const ClientManager = () => {
    let { data, errors } =  useContentful(query);

    if(errors) {
      return <span>{errors.map(error => error.message).join(", ")}</span>
    } 
    if(!data) {
      return <span> Loading... </span>
    } 

    const { moduleCollection } = data;

    return (
        <div className="homeCardTopSpacing mx-5" md={3}>
          {moduleCollection.items.map((item) =>
          <ModuleCard item={item} />
          )}
          
          
        </div>
        
    )
}

export default ClientManager;