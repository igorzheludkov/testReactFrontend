import React, { useState, ChangeEvent } from "react"
import styles from "./index.module.css"

interface Option {
  id: number
  label: string
}

interface IProps {
  onChange: (items: number[]) => void
  savedValues: number[]
}

const Dropdown = ({ onChange, savedValues }: IProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const options: Option[] = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
    { id: 4, label: "Option 4" },
    { id: 5, label: "Option 5" },
    { id: 6, label: "Option 6" },
  ]

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = event.target

    if (checked) {
      onChange([...savedValues, Number(id)])
    } else {
      onChange(savedValues.filter((item) => item !== Number(id)))
    }
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropdownToggle} onClick={toggleDropdown}>
        {isOpen
          ? `Close Dropdown (${savedValues?.join(", ") || "None"})`
          : `Open Dropdown (${savedValues?.join(", ") || "None"})`}
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option.id} className={styles.checkboxText}>
              <input
                type="checkbox"
                value={option.label}
                id={option.id.toString()}
                checked={savedValues?.includes(option.id)}
                onChange={handleCheckboxChange}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dropdown
