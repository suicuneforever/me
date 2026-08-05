import { useForm } from '@tanstack/react-form';
import { z } from 'zod';
import './ContactMe.scss';
import { useMutation } from '@tanstack/react-query';
import { sendEmail } from '../../api/api';

interface Email {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const PARENT_CLASS = 'ContactMe';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Invalid email address.').min(1, 'Email is required'),
  company: z.string(),
  message: z.string().min(1, 'Message is required'),
});

function ContactMe() {
  const mutation = useMutation({
    mutationFn: async (email: Email) => sendEmail(email.name, email.email, email.message, email.company),
    onSuccess: (data) => {
      console.log('data:', data);
    },
  });

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutateAsync({ name: value.name, email: value.email, company: value.company, message: value.message });
      console.log(value);
    },
  });

  return (
    <div className={`${PARENT_CLASS}`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="name"
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.map((error: any) => error?.message)}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="email"
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Email:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.map((error: any) => error?.message)}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="company"
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Company (optional):</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="message"
            children={(field) => {
              // Avoid hasty abstractions. Render props are great!
              return (
                <>
                  <label htmlFor={field.name}>Message:</label>
                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {!field.state.meta.isValid && (
                    <em role="alert">{field.state.meta.errors.map((error: any) => error?.message)}</em>
                  )}
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting, state.isPristine]}
          children={([canSubmit, isSubmitting, isPristine]) => (
            <>
              <button type="submit" disabled={!canSubmit || isPristine}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button
                type="reset"
                onClick={(e) => {
                  // Avoid unexpected resets of form elements (especially <select> elements)
                  e.preventDefault();
                  form.reset();
                }}
              >
                Reset
              </button>
            </>
          )}
        />
      </form>
    </div>
  );
}

export default ContactMe;
