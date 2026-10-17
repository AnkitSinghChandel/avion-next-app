import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function MyTodoTask() {
  const [Ankit] = useAutoAnimate();

  const createEmptyRow = () => ({
    id: crypto.randomUUID(),
    firstName: "",
    middleName: "",
    lastName: "",
  });

  const [personalTaskData, setPersonalTaskData] = useState([]);

  const [formData, setFormData] = useState(createEmptyRow());

  const handleInputChange = (index, field, value) => {
    setPersonalTaskData((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );

    // update in api while typing
    const task = personalTaskData[index];
    if (task?.id) {
      // dispatchEvent(updateTaskApi(task.id, field, value));
    }
  };

  const addNewRow = () => {
    const { firstName, middleName, lastName } = formData;

    if (!firstName.trim() || !middleName.trim() || !lastName.trim()) {
      return;
    }

    // setPersonalTaskData((prev) => [...prev, formData]);
    // or
    setPersonalTaskData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID().slice(0, 8),
        firstName,
        middleName,
        lastName,
      },
    ]);

    setFormData(createEmptyRow());
  };

  return (
    <div ref={Ankit}>
      <p className="pt-3">My Personal ToDo Tasks</p>

      {personalTaskData.map((item, index) => {
        return (
          <div
            className="flex gap-2 pt-5"
            key={item.id}
            style={{ marginBottom: "10px" }}
          >
            <input
              type="text"
              placeholder="First Name"
              className="ms-2 border-1"
              value={item.firstName}
              onChange={(e) =>
                handleInputChange(index, "firstName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Middle Name"
              className="ms-2 border-1"
              value={item.middleName}
              onChange={(e) =>
                handleInputChange(index, "middleName", e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Last Name"
              className="ms-2 border-1"
              value={item.lastName}
              onChange={(e) =>
                handleInputChange(index, "lastName", e.target.value)
              }
            />

            <div className="flex gap-2 font-bold pointer">
              <p
                className="font-bold text-red-500"
                onClick2={() => {
                  setPersonalTaskData((prev) =>
                    prev.filter((x) => x.id !== item.id),
                  ); // id se delete
                  setPersonalTaskData((prev) =>
                    prev.filter((_, i) => i !== index),
                  ); // index se delete
                }}
                onClick={() => {
                  let data = [...personalTaskData];
                  data.splice(index, 1);
                  setPersonalTaskData(data);
                }}
              >
                x
              </p>
            </div>
          </div>
        );
      })}

      {/* static Fields start */}
      <div className="flex gap-2 pt-5" style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="First Name"
          className="ms-2 border-1"
          value={formData?.firstName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              firstName: e.target.value,
            }))
          }
        />

        <input
          type="text"
          placeholder="Middle Name"
          className="ms-2 border-1"
          value={formData?.middleName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              middleName: e.target.value,
            }))
          }
        />

        <input
          type="text"
          placeholder="Last Name"
          className="ms-2 border-1"
          value={formData?.lastName}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              lastName: e.target.value,
            }))
          }
        />

        <div className="flex gap-2 font-bold pointer">
          {formData.firstName && formData.middleName && formData.lastName && (
            <button className="pointer" onClick={addNewRow}>
              ✔
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyTodoTask;
