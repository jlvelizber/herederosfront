import { useState, ChangeEvent, KeyboardEvent, FC } from "react";
import { TextField } from "@mui/material";

export const SeekerKidBar: FC<{
  onPressSeeker: (valueEnter: string) => void;
}> = ({ onPressSeeker }) => {
  const [valueSeeker, setValueSeeker] = useState<string>("");

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setValueSeeker(e.target.value);
    // console.log(e.target.value);
  };

  const onPressEnter = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      event.stopPropagation();
      // await findKids(valueSeeker);
      onPressSeeker(valueSeeker);
    }
  };

  return (
    <div className="row my-3">
      <TextField
        id="outlined-basic"
        onChange={handleChangeValue}
        value={valueSeeker}
        fullWidth
        label="Busque por nombre del niño, cédula del niño o padre del niño"
        variant="outlined"
        onKeyUp={onPressEnter}
      />
    </div>
  );
};
