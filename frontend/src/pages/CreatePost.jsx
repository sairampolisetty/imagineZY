import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from "@clerk/clerk-react";

import { preview } from '../assets'
import { FormField, Loader } from '../components'
import { getRandomPrompt } from '../utils'

const CreatePost = () => {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  });
  const [generateImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  // GENERATE IMAGE works even if not signed in
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('https://imaginezy.onrender.com/api/v1/imaginezy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: form.prompt }),
        })

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please enter a prompt');
    }
  }

  // SUBMIT shows alert if not signed in
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSignedIn) {
      alert('You need to sign in to post to community!');
      return;
    }
    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const postData = { ...form, userId: user.id };
        const response = await fetch('https://imaginezy.onrender.com/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        const data = await response.json();
        if (data.success) {
          navigate('/');
        }
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please enter a prompt and generate an image');
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt })
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[28px]">
          Create
        </h1>
        <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">
          Create imaginative and visually stunning
          images by <span className="font-bold">Pollination.AI</span> within less than 5 seconds. And share them with community
        </p>
      </div>

      <form className="mt-5 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="search"
            name="name"
            placeholder="Ex., John Doe"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="prompt"
            type="search"
            name="prompt"
            placeholder="Ex., a surrealist dream-like oil painting by Salvador Dalí of a cat playing checkers"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative ">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="max-w-md h-auto object-contain"
              />
            ) : (
              <></>
            )}
            {generateImg && (
              <div className="mt-2 absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button type="button"
            onClick={generateImage}
            className="cursor-pointer text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generateImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-5">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with others in the community
          </p>
          <button
            type="submit"
            className="cursor-pointer mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default CreatePost
