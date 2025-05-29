// import * as React from 'react';
// import {Text, Pressable} from 'react-native';

// import {View as MView} from 'moti';

// import { AnimatePresence } from 'framer-motion';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const colors = {
//   primary: '#F85A89',
//   secondary: '#FFEDF3',
// };

// function Component() {
//   const [buttonState, setButtonState] = React.useState('EMPTY');
//   const [count, setCount] = React.useState(24);
//   return (
//     <Pressable
//       onPressIn={() => setButtonState('PRESSED')}
//       onPressOut={() => {
//         setCount(count => count + 1);
//         setButtonState('ACTIVE');
//       }}>
//       <>
//         {/* <AnimatePresence>
//           <MView
//             key={`bg-${count}`}
//             from={{
//               scale: 0,
//               opacity: 1,
//             }}
//             animate={{
//               scale: 0.5,
//               opacity: 0.7,
//             }}
//             exit={{
//               scale: 3,
//               opacity: 0,
//             }}
//             transition={{
//               type: 'timing',
//               duration: 600,
//             }}
//             style={[
//               StyleSheet.absoluteFillObject,
//               {
//                 backgroundColor: colors.primary,
//                 // zIndex: -1,
//                 borderRadius: '50%',
//               },
//             ]}
//           />
//         </AnimatePresence> */}
//         <AnimatePresence>
//           {buttonState === 'ACTIVE' && (
//             <MView
//               key={`label-${count}`}
//               from={{
//                 translateY: 40,
//                 opacity: 0,
//               }}
//               animate={{
//                 translateY: [-40, -40, 0],
//                 opacity: [1, 1, 0],
//               }}
//               exit={{
//                 translateY: 0,
//                 opacity: 0,
//               }}
//               transition={{
//                 type: 'timing',
//                 duration: 400,
//               }}
//               style={{
//                 position: 'absolute',
//                 alignSelf: 'center',
//                 backgroundColor: colors.primary,
//                 width: 40,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 borderRadius: 20,
//               }}>
//               <Text
//                 style={{
//                   fontFamily: 'Menlo',
//                   fontSize: 16,
//                   color: '#fff',
//                   fontWeight: '900',
//                 }}>
//                 {count}
//               </Text>
//             </MView>
//           )}
//         </AnimatePresence>
//         <MView
//           style={{
//             // padding: 20,
//             borderRadius: 20,
//             backgroundColor: colors.secondary,
//           }}
//           from={{
//             scale: 1,
//           }}
//           animate={{
//             scale: buttonState === 'PRESSED' ? 0.9 : 1,
//           }}
//           transition={{
//             type: 'timing',
//             duration: 200,
//           }}>
//           <MView
//             from={{
//               scale: 1,
//             }}
//             animate={{
//               scale: buttonState === 'PRESSED' ? 0.8 : [1.4, 1],
//             }}
//             transition={{
//               type: 'timing',
//               duration: 300,
//             }}>
//             <FontAwesome name="heart" size={20} color={colors.primary} />
//           </MView>
//         </MView>
//       </>
//     </Pressable>
//   );
// }

// export const HeartLike = React.memo(Component);
