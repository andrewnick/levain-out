import React from "react";
// import { mutation } from "../../graphql/gqlClient";
// import Setting from "../../db/models/Setting";
// import {
//   Formik,
//   FormikHelpers,
//   FormikProps,
//   Form,
//   Field,
//   FieldProps,
// } from "formik";

// const SET_SETTING = `
//   mutation setSetting($max: Int!, $min: Int!) {
//     setSetting(max: $max, min: $min) {
//       created_at
//       set_point_max
//       set_point_min
//     }
//   }
// `;

// const SetTemp: React.FC<{ setting: Setting }> = ({ setting }) => {
//   // const { loading, error, data, fetchMore, networkStatus } = useQuery(SETTING_QUERY)
//   // const [setSetting, { settingData }] = useMutation(SET_SETTING);

//   // if (error) {
//   //     console.log(error);
//   //     return <div>Error loading settings</div>
//   // }
//   // if (loading) return <div>Loading</div>

//   // console.log(setting);
//   const { set_point_min, set_point_max }: Setting = setting;

//   return (
//     <Formik
//       initialValues={{
//         set_point_min: set_point_min,
//         set_point_max: set_point_max,
//       }}
//       onSubmit={(values) => {
//         const { set_point_min, set_point_max } = values;
//         mutation(SET_SETTING, {
//           min: set_point_min,
//           max: set_point_max,
//         });
//       }}
//     >
//       {(props) => {
//         const {
//           values,
//           touched,
//           errors,
//           dirty,
//           isSubmitting,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           handleReset,
//         } = props;
//         return (
//           <Form className="w-full max-w-lg">
//             <div className="flex flex-wrap -mx-3 mb-6">
//               <div className="w-full px-3 mb-6 md:mb-0">
//                 <div className="font-bold text-xl mb-4">
//                   Set temperate thresholds
//                 </div>
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                 <label
//                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-last-name"
//                 >
//                   Lower (°C)
//                 </label>
//                 <input
//                   id="set_point_max"
//                   value={values.set_point_max}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                   type="text"
//                   placeholder=""
//                 />
//               </div>
//               <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//                 <label
//                   className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-first-name"
//                 >
//                   Upper (°C)
//                 </label>
//                 <input
//                   id="set_point_min"
//                   value={values.set_point_min}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
//                   type="text"
//                   placeholder=""
//                 />
//               </div>
//               <div className="w-full md:flex md:items-center mb-6 md:mb-0">
//                 <div className="md:w-1/2"></div>
//                 <div className="md:w-1/2 px-3">
//                   <button
//                     disabled={!dirty || isSubmitting}
//                     className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
//                     type="submit"
//                   >
//                     Set
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </Form>
//         );
//       }}
//     </Formik>
//   );
// };

// export default SetTemp;
