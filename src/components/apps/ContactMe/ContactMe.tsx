import { createFormHook } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { sendEmail } from "../../../api/api";
import { CONTACT_LINKS, CONTACT_TABS } from "../../../constants/constants";
import { fieldContext, formContext } from "../../../hooks/AppFormContext";
import { Email } from "../../../types/types";
import TextField from "../../general/TextField";
import "./ContactMe.scss";

const PARENT_CLASS = "ContactMe";

const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {},
});

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address.").min(1, "Email is required"),
  company: z.string(),
  message: z.string().min(1, "Message is required"),
});

function ContactMe() {
  const [currentTab, setCurrentTab] = useState<string>("EMAIL");
  const [sucessMessage, setSuccessMessage] = useState<string>("");

  const form = useAppForm({
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
        {CONTACT_TABS.map((tab) => (
          <div
            key={tab.id}
            role="button"
            tabIndex={0}
            className={
              currentTab === tab.id
                ? `${PARENT_CLASS}__tab ${PARENT_CLASS}__tab--active`
                : `${PARENT_CLASS}__tab`
            }
            onClick={() => setCurrentTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className={`${PARENT_CLASS}__container`}>
        {currentTab === "EMAIL" ? (
          <>
            <div className={`${PARENT_CLASS}__heading`}>
              <img src="icons/email.png" alt="email" />
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
              <form.AppField
                name="name"
                children={(field) => (
                  <field.TextField label="Name" isRequired />
                )}
              />
              <form.AppField
                name="email"
                children={(field) => (
                  <field.TextField label="Email" isRequired />
                )}
              />
              <form.AppField
                name="company"
                children={(field) => <field.TextField label="Company" />}
              />
              <div className={`${PARENT_CLASS}__divider`}></div>
              <form.AppField
                name="message"
                children={(field) => (
                  <field.TextField label="Message" isRequired isTextArea />
                )}
              />
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
            {CONTACT_LINKS.map((link) => (
              <a key={link.href} href={link.href} target="_blank">
                <img src={link.icon} alt={link.label} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactMe;
