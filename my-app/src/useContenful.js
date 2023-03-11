import { useEffect, useState } from "react";

const { REACT_APP_CONTENTFUL_ACCESS_TOKEN, REACT_APP_CONTENTFUL_SPACE} = process.env
const useContentful = (query) => {
    let [data, setData] = useState(null);
    let[errors, setErrors] = useState(null);

    useEffect(() => {
        window.fetch(
                `https://graphql.contentful.com/content/v1/spaces/${REACT_APP_CONTENTFUL_SPACE}?access_token=${REACT_APP_CONTENTFUL_ACCESS_TOKEN}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${REACT_APP_CONTENTFUL_ACCESS_TOKEN}`
                    },
                    body: JSON.stringify({ query }),
                }
            ) 
            
            .then((response) => response.json())
            .then(({data, errors}) => {
                if(errors) {
                    setErrors(errors)
                }
                if(data) {
                    setData(data)
                }
            })
            .catch((error => setErrors([error])));
    }, [query]);

    return { data, errors };
}

export default useContentful;