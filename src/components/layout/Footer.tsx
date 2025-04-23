
export function Footer() {
  return (
    <footer className="mt-auto py-6 border-t border-border">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Video Manager</p>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Dark Video Haven</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
