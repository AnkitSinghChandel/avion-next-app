import { useState } from "react";

const MyTodoTask = () => {
  const createEmptyRow = () => ({
    id: crypto.randomUUID().slice(0, 8),
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [formData, setFormData] = useState([createEmptyRow()]);

  const handleChange = (id, field, value) => {
    const updatedData = formData.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );

    // Last row complete ho gayi to auto new row open hogi
    const last = updatedData[updatedData.length - 1];

    if (last.firstName && last.middleName && last.lastName) {
      updatedData.push(createEmptyRow());
    }
    setFormData(updatedData);
  };

  console.log("formData", formData);

  const handleDelete = (id) => {
    if (formData.length === 1) return;
    setFormData(formData.filter((item) => item.id !== id));
  };

  return (
    <div>
      <p className="pt-3">My Personal ToDo Tasks2</p>
      {formData.map((item, index) => (
        <div key={item.id} className="flex gap-2 pt-5">
          <input
            type="text"
            placeholder="First Name"
            className="ms-2 border-1"
            value={item.firstName}
            onChange={(e) => handleChange(item.id, "firstName", e.target.value)}
          />

          <input
            type="text"
            placeholder="Middle Name"
            className="ms-2 border-1"
            value={item.middleName}
            onChange={(e) =>
              handleChange(item.id, "middleName", e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Last Name"
            className="ms-2 border-1"
            value={item.lastName}
            onChange={(e) => handleChange(item.id, "lastName", e.target.value)}
          />

          {index !== formData.length - 1 && (
            <span
              onClick={() => handleDelete(item.id)}
              style={{
                color: "red",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              ×
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
export default MyTodoTask;
