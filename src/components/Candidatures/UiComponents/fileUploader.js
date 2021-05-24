import { Input } from "@material-ui/core";
import { Field, useField, useFormikContext } from "formik";

const FileUploader = ({ name }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(name);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFieldValue(name, file);
  };
  // const configSelect = {
  //   ...field,
  //   select: true,
  //   variant: "none",
  //   fullWidth: true,
  //   type: "file",
  // };
  return (
    <Field type="file" name={field} onChange={handleChange}></Field>
    // <Input {...configSelect}></Input>
  );
};

export default FileUploader;
