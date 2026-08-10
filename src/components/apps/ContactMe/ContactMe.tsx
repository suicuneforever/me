import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { sendEmail } from "../../../api/api";
import "./ContactMe.scss";

// TODO extract type
export interface Email {
  name: string;
  email: string;
  company?: string;
  message: string;
}

const PARENT_CLASS = "ContactMe";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address.").min(1, "Email is required"),
  company: z.string(),
  message: z.string().min(1, "Message is required"),
});

function ContactMe() {
  const [currentTab, setCurrentTab] = useState<string>("EMAIL");
  const [sucessMessage, setSuccessMessage] = useState<string>("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      company: "",
      message: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      mutation.mutateAsync({
        name: value.name,
        email: value.email,
        company: value.company,
        message: value.message,
      });
    },
  });

  const mutation = useMutation({
    mutationFn: async (email: Email) => sendEmail(email),
    onSuccess: () => {
      form.reset();
      setSuccessMessage("Email sent successfully!");
    },
  });

  return (
    <div className={`${PARENT_CLASS}`}>
      <div className={`${PARENT_CLASS}__tab-list`}>
        <div
          className={
            currentTab === "EMAIL"
              ? `${PARENT_CLASS}__tab ${PARENT_CLASS}__tab--active`
              : `${PARENT_CLASS}__tab`
          }
          onClick={() => setCurrentTab("EMAIL")}
        >
          Email
        </div>
        <div
          className={
            currentTab === "LINKS"
              ? `${PARENT_CLASS}__tab ${PARENT_CLASS}__tab--active`
              : `${PARENT_CLASS}__tab`
          }
          onClick={() => setCurrentTab("LINKS")}
        >
          Links
        </div>
      </div>
      <div className={`${PARENT_CLASS}__container`}>
        {currentTab === "EMAIL" ? (
          <>
            <div className={`${PARENT_CLASS}__heading`}>
              <img src="icons/email.png" />
              <div>
                Contact me here! Reach out for anything, it could be work
                related, art related, or even just to say hi! I would love to
                hear from you :-) All emails will be sent to my personal email,
                danijrmllo@gmail.com.
              </div>
            </div>
            <div className={`${PARENT_CLASS}__divider`}></div>
            <form
              className={`${PARENT_CLASS}__form`}
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className={`${PARENT_CLASS}__field`}>
                <form.Field
                  name="name"
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>
                          <span className={`${PARENT_CLASS}__underline`}>
                            N
                          </span>
                          ame:
                          <span className={`${PARENT_CLASS}__required`}>*</span>
                        </label>
                        <div className={`${PARENT_CLASS}__input`}>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <div className={`${PARENT_CLASS}__error-message`}>
                            {!field.state.meta.isValid && (
                              <em role="alert">
                                {field.state.meta.errors.map(
                                  (error: any) => error?.message,
                                )}
                              </em>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <div className={`${PARENT_CLASS}__field`}>
                <form.Field
                  name="email"
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>
                          <span className={`${PARENT_CLASS}__underline`}>
                            E
                          </span>
                          mail:
                          <span className={`${PARENT_CLASS}__required`}>*</span>
                        </label>
                        <div className={`${PARENT_CLASS}__input`}>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <div className={`${PARENT_CLASS}__error-message`}>
                            {!field.state.meta.isValid && (
                              <em role="alert">
                                {field.state.meta.errors.map(
                                  (error: any) => error?.message,
                                )}
                              </em>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <div className={`${PARENT_CLASS}__field`}>
                <form.Field
                  name="company"
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>
                          <span className={`${PARENT_CLASS}__underline`}>
                            C
                          </span>
                          ompany (optional):
                        </label>
                        <div className={`${PARENT_CLASS}__input`}>
                          <input
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <div className={`${PARENT_CLASS}__divider`}></div>
              <div className={`${PARENT_CLASS}__field`}>
                <form.Field
                  name="message"
                  children={(field) => {
                    return (
                      <>
                        <label htmlFor={field.name}>
                          <span className={`${PARENT_CLASS}__underline`}>
                            M
                          </span>
                          essage:
                          <span className={`${PARENT_CLASS}__required`}>*</span>
                        </label>
                        <div className={`${PARENT_CLASS}__input`}>
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                          <div className={`${PARENT_CLASS}__error-message`}>
                            {!field.state.meta.isValid && (
                              <em role="alert">
                                {field.state.meta.errors.map(
                                  (error: any) => error?.message,
                                )}
                              </em>
                            )}
                          </div>
                        </div>
                      </>
                    );
                  }}
                />
              </div>
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isPristine]}
                children={([canSubmit, isPristine]) => (
                  <div className={`${PARENT_CLASS}__footer`}>
                    <span>{sucessMessage}</span>
                    <button
                      className={`${PARENT_CLASS}__button`}
                      type="submit"
                      disabled={!canSubmit || isPristine || mutation.isPending}
                    >
                      <span className={`${PARENT_CLASS}__underline`}>S</span>
                      ubmit
                    </button>
                  </div>
                )}
              />
            </form>
          </>
        ) : (
          <div className={`${PARENT_CLASS}__links`}>
            <a href="https://github.com/suicuneforever" target="_blank">
              <img src="icons/github.png" />
            </a>
            <a
              href="https://www.linkedin.com/in/danijaramillo/"
              target="_blank"
            >
              <img src="icons/linkedin.png" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMe;
