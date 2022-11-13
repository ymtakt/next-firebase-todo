// import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import React, { useEffect, useState } from 'react'
// import { db } from "../firebase";
// import { Flex, Box, Stack, Text, List } from '@chakra-ui/react'

// // // import { app, db, aa } from "../firebase";
// // import { getDocs } from "firebase/firestore";



// export const TodoList = () => {
//   const [todos, setTodos] = useState<Array<any>>([]);


//   useEffect(() => {
//     db.collection("todos")
//       .orderBy("createdAt")
//       .onSnapshot((snapshot) => {
//         setTodos(snapshot.docs.map((doc) => doc.data()));
//       })
//   }, [])

//   // useEffect(() => {
//   //   const collectionRef = collection(db, "todos")
//   //   const q = query(collectionRef, orderBy("createdAt", "desc"));

//   //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
//   //     setTodos(querySnapshot.docs.map(doc => doc.data())
//   //     )
//   //   });
//   //   return unsubscribe;
//   // }, []);

//   return (
//     <>
//       <List>
//         {todos.map((todo: any, id) => (
//           <Todo
//             id={id}
//             title={todo.title}
//             content={todo.content}
//             timestamp={todo.createdAt}
//           />
//         ))}
//       </List>
//     </>
//   )
// }
