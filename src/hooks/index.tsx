import React from "react";

const url = "https://consensys-93520259f634.herokuapp.com/api/createRoom";

export default function useCreateRoom(name: string): { result: string, loading: boolean } {
    const [result, setResult] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    console.log('hi')
  
    React.useEffect(() => {
        async function createRoom(name: string) {
            try {
                setLoading(true);
                const response = await fetch(url, {
                    mode: "no-cors", 
                    headers: {
                        'Access-Control-Allow-Origin':'*',
                    }
                });
                const json: string = await response.json();
                console.log(json);
                setResult(json);
            } catch (error) {
                setLoading(false);
            }
        }
  
      if (result !== "") {
        createRoom(name);
      }
    }, [name, result]);
  
    return { result, loading };
  }
  