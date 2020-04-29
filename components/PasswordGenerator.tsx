import { useEffect, useState } from "react"
import { usePersistedState } from "../hooks"

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase = "abcdefghijklmnopqrstuvwxyz"
const numbers = "01234567890"
const special = "-_.(),^+$!?:%/@+=*#"

function generatedCharacter() {
  const chars = uppercase.concat(lowercase).concat(numbers).concat(special)
  return chars[Math.floor(Math.random() * chars.length)]
}

function generatePassword(length: string) {
  let generatedPassword = ""
  for (let index = 0; index < (length === "" ? 16 : parseInt(length)); index++) {
    generatedPassword += generatedCharacter()
  }
  return generatedPassword
}

const Button = ({ setGeneratedPassword, length }) => (
  <span className="rounded-md shadow-sm">
    <button
      onClick={() => setGeneratedPassword(generatePassword(length))}
      type="button"
      className="w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700"
    >
      Generate Password
    </button>
  </span>
)

const Output = ({ generatedPassword }) => (
  <div className="overflow-hidden bg-white rounded-lg shadow">
    <div className="px-4 py-5 sm:p-6">
      <div className="flex justify-between">
        <span className="leading-5 break-all">{generatedPassword}</span>
        <button
          aria-label="Copy generated password"
          onClick={() => {
            navigator.clipboard.writeText(generatedPassword)
          }}
          className="ml-3 text-gray-400 hover:text-gray-500"
        >
          <svg className="h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
)

export const PasswordGenerator = () => {
  const [generatedPassword, setGeneratedPassword] = useState("")
  const [length, setLength] = usePersistedState("length", "")

  useEffect(() => {
    const password = generatePassword(length)
    setGeneratedPassword(password)
  }, [length])

  return (
    <div className="grid h-full max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <div className="flex flex-col space-y-5 self-center py-4 sm:py-6 lg:py-8">
        <Output generatedPassword={generatedPassword} />
        <label htmlFor="length" className="sr-only">
          Length
        </label>
        <span>
          <span className="inline-flex rounded-md shadow-sm">
            <span className="flex items-center px-3 text-gray-500 border border-r-0 border-gray-300 rounded-l-md bg-gray-50 sm:text-sm">
              Length
            </span>
            <input
              id="length"
              type="number"
              className="px-3 py-2 rounded-none form-input rounded-r-md sm:text-sm sm:leading-5"
              placeholder="16"
              value={length}
              min="1"
              max="2048"
              onChange={(e) => {
                const valueString = e.target.value
                const valueNumber = valueString === "" ? 16 : parseInt(valueString)
                const newLength = valueNumber > 2048 ? "2048" : valueNumber < 1 ? "" : valueString
                setLength(newLength)
              }}
            />
          </span>
        </span>
        <Button setGeneratedPassword={setGeneratedPassword} length={length} />
      </div>
    </div>
  )
}
