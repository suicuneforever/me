import { useFieldContext } from "../../../hooks/AppFormContext";
import "./TextField.scss";

const PARENT_CLASS = "TextField";

interface TextFieldProps {
  label: string;
  isRequired?: boolean;
  isTextArea?: boolean;
}

function TextField({ label, isRequired, isTextArea }: TextFieldProps) {
  const field = useFieldContext<string>();

  return (
    <div className={PARENT_CLASS}>
      <label htmlFor={field.name}>
        <span className={`${PARENT_CLASS}__underline`}>{label[0]}</span>
        <span>{label.substring(1)}:</span>
        {isRequired ? (
          <span className={`${PARENT_CLASS}__required`}>*</span>
        ) : null}
      </label>
      <div className={`${PARENT_CLASS}__input`}>
        {isTextArea ? (
          <textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        ) : (
          <input
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
          />
        )}
        {isRequired ? (
          <div className={`${PARENT_CLASS}__error-message`}>
            {!field.state.meta.isValid && (
              <em role="alert">
                {field.state.meta.errors.map((error) => error?.message)}
              </em>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TextField;
