import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../../../../redux/categorySlice";

export default function Overview({
  title,
  description,
  subCateId,
  titleDf,
  descriptionDf,
  subCateIdDf,
}) {
  const category = useSelector(selectAllCategories);
  const [cate, setCate] = useState(category[0]);
  console.log("title", titleDf);
  console.log("description", descriptionDf);
  console.log("subCateId", subCateIdDf);
  return (
    <div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "500px",
          margin: "0 auto",
          border: "2px solid #e0d4d8",
          padding: "20px",
        }}
      >
        <p
          style={{
            fontSize: "25px",
            fontWeight: "bold",
            color: "GrayText",
          }}
        >
          Tổng quan
        </p>
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          label="Tiêu đề"
          defaultValue={titleDf}
          onChange={title}
          required
        />
        <TextField
          style={{
            marginBottom: "10px",
          }}
          variant="outlined"
          // size="small"
          defaultValue={descriptionDf}
          label="Mô tả"
          multiline
          rows={5}
          onChange={description}
        />
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Danh mục</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={cate}
            label="Danh mục"
            onChange={(e) => setCate(e.target.value)}
          >
            {category.map((item) => (
              <MenuItem value={item}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          fullWidth
          style={{
            marginBottom: "10px",
          }}
        >
          <InputLabel id="demo-simple-select-label">Danh mục con</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={subCateIdDf}
            label="Danh mục con"
            onChange={subCateId}
          >
            {cate.subCategories.map((item) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
}
