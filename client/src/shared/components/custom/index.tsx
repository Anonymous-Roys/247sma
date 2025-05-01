
import CompsButton from "@/shared/components/custom/_btn";
import CompsCard from "@/shared/components/custom/_card";
import CompsInputField from "@/shared/components/custom/_input";
import CompsLabel from "@/shared/components/custom/_label";
import CompsModal from "@/shared/components/custom/_modal";
import CompsTable from "@/shared/components/custom/_table";
import { useState } from "react";



function CompsReusable() {
  const headers = ["Name", "Age", "Email"];
  const data = [
    { name: "Alice", age: 25, email: "alice@example.com" },
    { name: "Bob", age: 30, email: "bob@example.com" },
    { name: "Charlie", age: 35, email: "charlie@example.com" },
  ];


  const [isModalOpen, setModalOpen] = useState(false);

  const handleConfirm = () => {
    console.log("Confirmed!");
    setModalOpen(false); // Close the modal on confirm
  };
  return (
    <>
    <div className="p-4">
        {/* Table */}
      <CompsTable headers={headers} data={data} />
    </div>
    {/* Input field */}
      <CompsInputField type={'password'} placeholder="type here"/>
      {/* Input Button */}
      <CompsButton children={'login'} />
      <CompsLabel children={'My label'}/>

      <div className="p-4">
      <CompsButton onClick={() => setModalOpen(true)}>
        Open Modal
      </CompsButton>

      <CompsModal
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
        confirmText="Proceed"
        onConfirm={handleConfirm}
      >
        {/* You can add any additional content here */}
        <p>Make sure to backup your data before proceeding!</p>
      </CompsModal>
    </div>
    <div className="flex flex-wrap justify-between gap-2">
      
    
    <CompsCard
      title="Payment Success"
      description="Your payment has been processed successfully."
      imageUrl="https://via.placeholder.com/400" // Example image URL
      actions={
        <CompsButton onClick={() => alert("Button Clicked!")}>
          View Details
        </CompsButton>
      }
      className="my-4" // Additional class for custom styling
    />
    <CompsCard
      title="Payment Success"
      description="Your payment has been processed successfully."
      imageUrl="https://via.placeholder.com/400" // Example image URL
      actions={
        <CompsButton onClick={() => alert("Button Clicked!")}>
          View Details
        </CompsButton>
      }
      className="my-4" // Additional class for custom styling
    />
    <CompsCard
      title="Payment Success"
      description="Your payment has been processed successfully."
      imageUrl="https://via.placeholder.com/400" // Example image URL
      actions={
        <CompsButton onClick={() => alert("Button Clicked!")}>
          View Details
        </CompsButton>
      }
      className="my-4" // Additional class for custom styling
    />
    <CompsCard
      title="Payment Success"
      description="Your payment has been processed successfully."
      imageUrl="https://via.placeholder.com/400" // Example image URL
      actions={
        <CompsButton onClick={() => alert("Button Clicked!")}>
          View Details
        </CompsButton>
      }
      className="my-4" // Additional class for custom styling
    />
    </div>
    </>
  );
}

export default CompsReusable;
