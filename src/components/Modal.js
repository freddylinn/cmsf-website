import React, { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild, Description } from '@headlessui/react'

const Modal = (props) => {
    return (
        <Transition
            show={props.isOpen}
            as={Fragment}
        >
            <Dialog
                onClose={props.onClose}
                className='relative z-50'
            >
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <div
                        className='fixed inset-0 bg-black/40'
                        aria-hidden='true'
                    />
                </TransitionChild>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    <div className='fixed inset-0 flex items-start justify-center w-11/12 3xl:w-3/5 mx-auto mt-5'>
                        <DialogPanel className='relative p-8 mx-auto rounded bg-white text-center'>
                            <button onClick={props.onClose} className='absolute top-3 right-5 text-xl px-2 font-semibold text-gray-500'>X</button>
                            <DialogTitle className='font-bold text-2xl mb-5'>{props.title}</DialogTitle>
                            <Description className=''>
                                {props.description}
                            </Description>
                            {props.children}
                        </DialogPanel>
                    </div>
                </TransitionChild>
            </Dialog>
        </Transition>
    );
};

export default Modal;
