import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import {RedirMacro} from './redir-macro';
import "@testing-library/jest-dom"
import { Modal, router } from './mocks/forge-bridge';

describe('Redirection Macro', ()=>{
	// placeholder for test
	it('individual test 1', async()=>{
        const title = "title"
        const link = "https://www.google.com"
        render(<RedirMacro countdown={5} title={title} link={link}/>)
        const macro = screen.getByText(title);
        expect(macro).toBeInTheDocument();
        await userEvent.click(macro);
        expect(router.navigate).toBeCalled();
    })

    it('not visible', async()=>{
        const title = "title"
        const link = "https://www.google.com"
        render(<RedirMacro countdown={5} title={title} link={link} visible={false}/>)
        const macro = screen.queryByText(title);
        expect(macro).not.toBeInTheDocument();
    })

    it('internal link', async()=>{
        jest.useFakeTimers()
        Object.defineProperty(document, 'referrer', { value: 'https://test.atlassian.net', configurable: true });
        const title = "random-title"
        const link = "https://test.atlassian.net/wiki/helloworld"
        render(<RedirMacro countdown={1} title={title} link={link}/>)
        jest.advanceTimersByTime(2000);
        expect(Modal).toBeCalledWith(expect.objectContaining({resource: "redir-modal"}));
    })

    it('external link', async()=>{
        jest.useFakeTimers()
        Object.defineProperty(document, 'referrer', { value: 'https://test.atlassian.net', configurable: true });
        const title = "random-title"
        const link = "random-link"
        render(<RedirMacro countdown={1} title={title} link={link}/>)
        jest.advanceTimersByTime(2000);
        expect(router.navigate).toBeCalledWith(link);
    })
    
})
