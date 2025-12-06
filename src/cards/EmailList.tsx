import EmailCard from "./EmailCard";

const EmailList = ({ emails }: { emails: any[] }) => (
  <div className="space-y-3">
    {emails.map((email) => (
      <EmailCard key={email.id} email={email} />
    ))}
  </div>
);

export default EmailList;
