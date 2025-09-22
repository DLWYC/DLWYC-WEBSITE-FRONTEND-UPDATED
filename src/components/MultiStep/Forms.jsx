import { Input } from "../../components/ui/input";
import { useLocation, useNavigate } from "@tanstack/react-router";


const Form = ({ className, array, text, values, setValues }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

     console.log("Valuse", values)

  const submitData = async (e) => {
    e.preventDefault();
    // console.log("herer")
//     try {
//       // Login Page
//       if (pathname === "/") {
//         const error = await LoginFormErrorHandler(values);
//         if (error) {
//           toast.error(error);
//           return;
//         }
//         const data = await login({ values });
//         console.log(data, "Login Message");
//         if (data) {
//           navigate({ to: "/userdashboard" });
//         }
//       }

//       // Create Complaints Page
//       if (pathname === "/userdashboard/complaints") {
//         const error = await ComplainFormErrorHandler(values);
//         if (error) {
//           toast.error(error);
//           return;
//         }
//         const complainValues = {
//           matricNumber: student.matricNumber,
//           hostelName: student.hostelName,
//           roomNumber: student.romNumber,
//           ...values,
//         };
//         const data = await createComplaints(complainValues);
//         if (data) {
//           navigate({ to: "/userdashboard/complaints" });
//         }
//       }

//       // Create Geofence page
//       if (pathname === "/admin/geofences/create-geofence") {
//         const error = await CreateGeofenceErrorHandler(values);
//         if (error) {
//           toast.error(error);
//           return;
//         }
//         const geofenceValues = {
//           geofenceCoordinate: geofenceCoordinate,
//           ...values,
//         };
//         const data = await createGeofence(geofenceValues);
//         if (data) {
//           console.log(data);
//           navigate({ to: "/admin" });
//         }
//       }
     
//       // Update Geofence page
//       if (pathname === `{/admin/geofences/${student.hostelName}/${student.hosteNumber}`) {
//         const error = await CreateGeofenceErrorHandler(values);
//         if (error) {
//           toast.error(error);
//           return;
//         }
//         const geofenceValues = {
//           geofenceCoordinate: geofenceCoordinate,
//           ...values,
//         };
//         const data = await updateGeofence(geofenceValues);
//         if (data) {
//           console.log(data);
//           navigate({ to: "/admin" });
//         }
//       }
//     } catch (error) {
//       console.log("This is the error:", error);
//     }
  };

  return (
    <form className={`${className}  font-rubik `}>
      <div className=" grid gap-[15px]">
        {array.map((fields, index) => (
          <div className="w-full items-center flex flex-row gap-1 relative" key={index}>
               <label
              htmlFor={fields.name}
              className={`${"bottom-2 left-0 transition-all peer-focus:-translate-y-[120%] text-[#060f3b] peer-focus:text-reddish"}  ${values[fields.name] ? " font-500 text-[14px]" : "text-base"} `}
            >
              {fields.fieldName}:
            </label>

            <Input
              type={fields.type}
              id={fields.name}
              className="peer border-0  w-[80%] rounded-none focus:shadow-reddish"
              placeholder={""}
              required
              readOnly={fields?.readOnly ? fields.readOnly : ''}
              onChange={(e) =>
                setValues({ ...values, [fields.name]: e.target.value })
              }
              value={
                values[fields.name] || ""
              }
            />

            
          </div>
        ))}
        {/* {pathname === "/userdashboard/complaints" ? (
          <div className="grid relative mt-3">
            <Label
              htmlFor="description"
              className={`transition-all peer-focus:-translate-y-[150%] absolute -top-6 text-[#060f3b] peer-focus:text-red"} "text-base"} `}
            >
              Description: 
            </Label>
            <textarea
              name="description"
              rows={9}
              cols={9}
              placeholder="Please Feel Free To Express Your Mind..."
              className="border border-[#d3d9f4] p-1 outline-none resize-none "
              onChange={(e) =>
                setValues({ ...values, ['description']: e.target.value })
              }
            ></textarea>
          </div>
        ) : (
          ""
        )} */}

       
      </div>
    </form>
  );
};

export default Form;
